import React from 'react';
import styles from '../styles/Home.module.css'
import {PaneWindowCoordinates} from '../types/ui-components/index'

interface TableGridDrawerProps {
    paneWindowsCoordinates: PaneWindowCoordinates[]
    setPaneWindowsCoordinates(paneWindowsCoordinates: any): void
    setPaneWindowIndexAndRerender(e: number): void
    paneWindowIndexInFocus: number
}

interface TableGridDrawerUserClickDetection {
    type: "resize_nw" | "resize_se" | "moving_pane" | "idle"
    paneWindowId: number | null
    // used for moving/resizing
    startingCoordinates: [number, number] | null
    /**
     * What are the possible actions:
     *   - Changing the North-West (resize)
     *   - Changing the South-East (resize)
     *   - Changing both North-West and South-East
     */

}

const TableGridDrawer: React.FC<TableGridDrawerProps> = (props: TableGridDrawerProps) => {

    const { 
        paneWindowsCoordinates, 
        paneWindowIndexInFocus,
        setPaneWindowsCoordinates,
        setPaneWindowIndexAndRerender
    } = props;

    const [mode, setMode] = React.useState<TableGridDrawerUserClickDetection>({ type: 'idle', paneWindowId: null, startingCoordinates: null });

    const clickDetectionNoContext = (cellIdentifier: string): TableGridDrawerUserClickDetection => {

        const [userClickRow, userClickColumn] = cellIdentifier.split('_').map(e => parseInt(e));

        for (let paneIndex = 0; paneIndex < paneWindowsCoordinates.length; paneIndex++) {
            const paneWindow = paneWindowsCoordinates[paneIndex]
            const edgeClickNW = userClickRow === paneWindow.nw[0] && userClickColumn === paneWindow.nw[1];
            const edgeClickSE = userClickRow === paneWindow.se[0] && userClickColumn === paneWindow.se[1];

            if (edgeClickNW) {

                return {
                    type: "resize_nw",
                    paneWindowId: paneIndex,
                    startingCoordinates: [userClickRow, userClickColumn]
                }

            }

            if (edgeClickSE) {

                return {
                    type: "resize_se",
                    paneWindowId: paneIndex,
                    startingCoordinates: [userClickRow, userClickColumn]
                }

            }

            if (userClickRow >= paneWindow.nw[0] &&
                userClickRow <= paneWindow.se[0] &&
                userClickColumn >= paneWindow.nw[1] &&
                userClickColumn <= paneWindow.se[1]) {

                return {
                    type: "moving_pane",
                    paneWindowId: paneIndex,
                    startingCoordinates: [userClickRow, userClickColumn]
                }

            }

        }

        return {
            type: "idle",
            paneWindowId: null,
            startingCoordinates: null
        }
    }

    // handle registering of action
    const onCellDown = (cellIdentifier: string) => {
        const clickInitialDetection: TableGridDrawerUserClickDetection = clickDetectionNoContext(cellIdentifier);

        if (["resize_nw", "resize_se", 'moving_pane'].includes(clickInitialDetection.type)) {
            setMode(clickInitialDetection)
        }
    }

    const onCellUp = (cellIdentifier: string | null) => {
        setMode({ type: 'idle', paneWindowId: null, startingCoordinates: null })
    }

    const onCellHover = (cellIdentifier: string) => {

        const clickInitialDetection: TableGridDrawerUserClickDetection = clickDetectionNoContext(cellIdentifier);
        if (clickInitialDetection.paneWindowId != null) {
            setPaneWindowIndexAndRerender(clickInitialDetection.paneWindowId)
        }

        if (mode.paneWindowId === null) return;

        const [selectedRow, selectedCol] = cellIdentifier.split('_').map(e => parseInt(e));
        // set the nw (resize), se (resize) or both (moving)
        // call render()
        switch (mode.type) {

            case "resize_nw": {
                const currentPane: any | null = paneWindowsCoordinates[mode.paneWindowId];
                if (currentPane === null) break;
                currentPane.nw = [selectedRow, selectedCol];
                setPaneWindowsCoordinates([...paneWindowsCoordinates])
                break;
            }
            case "resize_se": {
                const currentPane: any | null = paneWindowsCoordinates[mode.paneWindowId];
                if (currentPane === null) break;
                currentPane.se = [selectedRow, selectedCol];
                setPaneWindowsCoordinates([...paneWindowsCoordinates])
                break;
            }
            case "moving_pane": {
                const originalCoordinate: [number, number] | null = mode.startingCoordinates;
                if (originalCoordinate === null) break;

                const diffRow = originalCoordinate[0] - selectedRow
                const diffCol = originalCoordinate[1] - selectedCol

                const currentPane: any | null = paneWindowsCoordinates[mode.paneWindowId];
                if (currentPane === null) break;

                currentPane.nw[0] -= diffRow
                currentPane.se[0] -= diffRow
                currentPane.nw[1] -= diffCol
                currentPane.se[1] -= diffCol

                setPaneWindowsCoordinates([...paneWindowsCoordinates])
                setMode({
                    ...mode,
                    startingCoordinates: [selectedRow, selectedCol]
                })

                break;
            }
            default: break;

        }


    }

    const generateTable = () => {

        const rowLength = 20;
        const colLength = 20;

        const paneNorthWestCoordinates: { [key: string]: boolean } = {}
        const paneSouthEastCoordinates: { [key: string]: boolean } = {}
        const screenContentCoordinates: { [key: string]: boolean } = {}
        const screenContentTableHighlightCoordinates: { [key: string]: boolean } = {}

        paneWindowsCoordinates.forEach((pane, paneIndex) => {
            const northWestCoordinate = pane.nw.join('_');
            const southEastCoordinate = pane.se.join('_');
            paneNorthWestCoordinates[northWestCoordinate] = true;
            paneSouthEastCoordinates[southEastCoordinate] = true;
            for (let rowIndex = pane.nw[0]; rowIndex <= pane.se[0]; rowIndex++) {

                for (let colIndex = pane.nw[1]; colIndex <= pane.se[1]; colIndex++) {

                    screenContentCoordinates[`${rowIndex}_${colIndex}`] = true
                    screenContentTableHighlightCoordinates[`${rowIndex}_${colIndex}`] = paneIndex === paneWindowIndexInFocus

                }

            }
        })

        const rowsAndColumns = Array(rowLength).fill(0).map((_, rowIndex) => {

            const columnsArray = Array(colLength).fill(0).map((_, colIndex) => {
                const cellIndex = `${rowIndex}_${colIndex}`;
                let edgeClassName = null;
                let screenContentClassName = null;
                if (paneNorthWestCoordinates[cellIndex]) edgeClassName = "north_west_cell"
                if (paneSouthEastCoordinates[cellIndex]) edgeClassName = "south_east_cell"
                if (screenContentCoordinates[cellIndex]) screenContentClassName = "screen_content_cell"
                if (screenContentTableHighlightCoordinates[cellIndex]) screenContentClassName = "screen_content_highlight_cell"
                return (
                    <td
                        key={cellIndex}
                        id={cellIndex}
                        onMouseEnter={(_) => onCellHover(cellIndex)}
                        onMouseDown={(_) => onCellDown(cellIndex)}
                        className={`
                            ${styles.table_drawer_cell} 
                            ${edgeClassName !== null ? styles[edgeClassName] : null}
                            ${screenContentClassName !== null ? styles[screenContentClassName] : null}
                        `}>
                    </td>
                )
            })

            return (
                <tr key={rowIndex}>
                    {columnsArray}
                </tr>
            )

        })

        return (
            <table 
                onMouseUp={(_) => onCellUp(null)}
                id="table-grid-drawer">
                <tbody
                >
                    {rowsAndColumns}
                </tbody>
            </table>
        )

    }

    return (
        <div>
            {generateTable()}
        </div>
    )

}

export { TableGridDrawer }